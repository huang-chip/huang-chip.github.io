import fs from 'fs';
import path from 'path';
import { Client } from 'ssh2';
import progress from 'progress-stream';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const project_name = 'dist';
// SSH 连接配置
const sshConfig = {
    host: '39.105.38.154',
    port: 22,
    username: 'root',
    // password: 'Toursynbio2024!'
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAudR5akpke6h5MECsHwFeunO1l+BlYk0GhqwszysQFEL1SDDs
C80nNex/VMvuFIA8BdMxLfsmAESNmU1whxmVjMvDNwx4z9bEDX/KCbKzwmiNWUl0
aQfJQzpeljpusIOVm3rtuwfe/BaHEdu5aF4bg6e/B8tX9qMmPvOL67AVnlRDwwpC
R3yXnOEfp5vU+sevYj/6H3gjvs0db9tG0BnOiRmDteJXBgdtEZfY2sXiryyvxt+C
3vczhk2LCYenNlgulVm67WfYVV/ao7nHG0gRjsS2Bd+KcrRY5B5E+qmsHBL1yUeC
BHdA9ow8ayzmwiCTyR6q82nuumWTV+Om7w8/cQIDAQABAoIBAQC1QZ48ItvoEehD
PJGmnHt9eieCQIojW+YlrgL2/5XrbXQ6Oh3DVRQN8OQyHcfXj0z8kYbCxtnGIRfM
lFBSNo48ivOa2jts3prUX/T9iKT1120nzhIR8FpLjL994Pjeizp+MWV4rLC/Smns
7VjniANmY1RdkeX22CQR+xRbi6FKkFRi817wqmUEiDmp/1putINfdogTAwMMEAhf
uW3Piep7kPdoNROhDe6Pf0L6UMDhmO2OOVB9P+Id2EPMw/EOgp599GVOLIENgpZ+
qR3h0wskmtzI9LVv/KTvjT5yLbCEv0e/5Cy+w79dH39KemJee7wkdxScKj28dULe
EdcqzTABAoGBAOcgPjwYfqFF0xymBcLi5mrdkq4rXETEyfd/7lza1ouKy9rUzDCi
oTLIzzgYYbJbzi9TnebZ1RAHkwtQn2xniwT6mIrlI33nY8LGUoLkweyH+xe9wdp5
wx9JBJ98WeYij1Hj+B4aLzOBbo93xxvMM7zkQnkRbM3wam6b9ODQtfoxAoGBAM3U
R9wRxJuAH14Y9DJdBbPd2OLlBcneA8VsbyBa0w5t1HraFZLstUh4sHYcQlgC6hQy
cqYaDX4frZjWA8ZvkdL0j83PMzMw476JrGschXvmKjEAKyZZqCR98+3/cL7miFDX
JkyIGVEJywQJzTE04zOUSZ3SbEKsp3qVLgtJPwlBAoGBAIywRtHkAyj+TOyybu1b
mvDQIVpd0JOXym0a9aiWGWTlvwNc51JvnHpCXEkEJmwgkBik6Ig+bwCL68lGcVTW
jnwgYryhkIIyWLqWaGF/CECH4aNpAdiQp+KiWusOEdcRkHZDs6P3QmYy0m8IdS4J
ljDULVZu8fFF+DOOQXib8znxAoGBAL/GWCXdkDfqSk+cJHqAXX3W5+uPw7LwXscl
XuzgcuFwx5and45ragTaHmANuGrUXFDxKA1HHOc0kMRkMyRCc7YAE7SIp4W8uZWg
JLuv2Vc1fn4lUA7tXlKR4CMR63SSytO3goGwFRaCb1uV3k9InaBDO8wGcMQ2pdz6
/emaF1eBAoGAeoZuCQYGRAlKmojKKkznTn+kSaMiZLmaLNY5K7sU0LR8hwKkc3LG
vWdXcP8XXcPOogc+jWd7IDGiXGi8cFFLpbKTH45EhR6tT+V4A7ccK6knhzjdmS1X
jP5uhvLkKwc40RhGr9MDGXBZbXWJYqvEUDGAsEGNTZQaIRmhH7L/uGQ=
-----END RSA PRIVATE KEY-----`,
};
// 本地目录路径和远程目标路径
const localDirectoryPath = path.resolve(__dirname, './dist');
// const remoteDirectoryPath = `/usr/local/app/toursynbio/docror-tao/${project_name}`; // 测试
const remoteDirectoryPath = `/usr/local/app/toursynbio/docror-tao`; // 测试
const remoteSHPath = `/usr/sbin`;

// SSH 连接
const conn = new Client();
conn.on('ready', () => {
    console.log('已连接到服务器');

    // 删除远程目录下的文件
    conn.exec('rm -rf ' + remoteDirectoryPath + '/*', (err, stream) => {
        if (err) {
            console.error('删除文件失败:', err);
            conn.end();
            return;
        }

        stream
            .on('close', (code, signal) => {
                console.log('已删除服务器端文件');

                // 上传文件
                conn.sftp((err, sftp) => {
                    if (err) {
                        console.error('SFTP 连接失败:', err);
                        conn.end();
                        return;
                    }

                    uploadFilesRecursively(localDirectoryPath, remoteDirectoryPath, sftp)
                        .then(() => {
                            conn.exec(`cd ${remoteSHPath} && nginx -s reload`, (err, stream) => {
                                if (err) {
                                    console.error('执行 nginx 脚本失败:', err);
                                    conn.end();
                                    return;
                                }

                                stream
                                    .on('close', (code, signal) => {
                                        console.log('部署完成');
                                        conn.end();
                                    })
                                    .on('data', data => {
                                        console.log(data.toString());
                                    });
                            });
                        })
                        .catch(error => {
                            console.error('文件上传失败:', error);
                            conn.end();
                        });
                });
            })
            .on('data', data => {
                console.log('删除文件输出:', data.toString());
            });
    });
});

// 连接到 SSH 服务器
conn.connect(sshConfig);

// 递归上传目录下的文件
function uploadFilesRecursively(localPath, remotePath, sftp) {
    return new Promise((resolve, reject) => {
        fs.readdir(localPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            const uploadPromises = files.map(file => {
                const localFilePath = localPath + '/' + file;
                const remoteFilePath = remotePath + '/' + file;

                return new Promise((resolve, reject) => {
                    fs.stat(localFilePath, (err, stats) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        if (stats.isDirectory()) {
                            sftp.mkdir(
                                remoteFilePath,
                                {
                                    mode: '0755',
                                },
                                err => {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }

                                    uploadFilesRecursively(localFilePath, remoteFilePath, sftp)
                                        .then(resolve)
                                        .catch(reject);
                                },
                            );
                        } else if (stats.isFile()) {
                            const readStream = fs.createReadStream(localFilePath);
                            const writeStream = sftp.createWriteStream(remoteFilePath);

                            const progressStream = progress({
                                length: stats.size,
                                time: 100, // 每隔100毫秒更新一次进度
                            });

                            progressStream.on('progress', progressData => {
                                const percentage = Math.round(progressData.percentage);
                                const transferred = progressData.transferred;
                                const total = progressData.length;
                                console.log(`文件上传中: ${percentage}%, ${transferred}/${total}`);
                            });

                            writeStream.on('close', () => {
                                console.log('文件上传成功:', localFilePath);
                                resolve();
                            });

                            readStream.pipe(progressStream).pipe(writeStream);
                        } else {
                            reject(new Error('不支持的文件类型'));
                        }
                    });
                });
            });

            Promise.all(uploadPromises).then(resolve).catch(reject);
        });
    });
}

// 获取当前时间（yyyy-MM-dd HH）
function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');

    return `${year}.${month}.${day}.${hour}`;
}
