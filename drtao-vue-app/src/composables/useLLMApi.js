import { useConfigStore } from '@/stores/config'

export function useLLMApi() {
  const configStore = useConfigStore()
  
  /**
   * 调用 LLM API（支持流式实时响应）
   * @param {string} userMessage 用户消息
   * @param {Function} onChunk 实时回调函数
   * @param {Array} historyMessages 历史消息数组
   */
  async function callLLMStream(userMessage, onChunk, historyMessages = []) {
    const isDev = import.meta.env.DEV
    // 开发环境走代理，生产环境走 Cloudflare Workers
    const baseUrl = isDev ? '/api' : configStore.apiBase
    const url = `${baseUrl}/chat/completions`
    
    // 构造完整的消息数组
    const messages = [
      { 
        role: 'system', 
        content: '你是"小淘博士"，面向8-16岁青少年的科普助教。用简洁、友好、比喻+例子的方式回答科学问题。要求：1) 先给出直接答案；2) 再用2-4句话解释原因；3) 如合适，附上1-2条延伸思考；4) 保持积极、鼓励的语气；5) 避免成人黑话与缩写，数学/物理公式尽量简化。' 
      },
      // 添加历史消息（多轮会话上下文）
      ...historyMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      // 当前用户消息
      { role: 'user', content: userMessage }
    ]
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${configStore.apiKey}`
      },
      body: JSON.stringify({
        model: configStore.apiModel,
        messages,
        stream: true,  // 开启流式响应
        temperature: 0.7,  // 采样温度
        max_tokens: 2000,  // 最大生成token数
        top_p: 1,  // 核采样参数
        presence_penalty: 0,  // 存在惩罚
        frequency_penalty: 0  // 频率惩罚
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    // 读取流式响应
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') continue
          
          try {
            const json = JSON.parse(data)
            const content = json.choices?.[0]?.delta?.content
            if (content) {
              onChunk(content)  // 实时回调每个文字片段
            }
          } catch (e) {
            console.warn('解析 JSON 失败:', e)
          }
        }
      }
    }
  }
  
  return { callLLMStream }
}

