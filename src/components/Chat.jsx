/* eslint-disable*/
import { useState, useEffect }  from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY =process.env.REACT_APP_OPEN_AI_KEY

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

	return (
		<div className="App">
			<div className="row">
				<div className="col position-relative" style={{ height: "360px" }}>
					<MainContainer>
						<ChatContainer>
							<MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="GPT đang soạn tin nhắn..." /> : null}>
								{messages.map((message, i) => (
									<Message
										key={i}
										model={{
											message: message.message,
											sentTime: message.sentTime,
											sender: message.sender,
											direction: message.sender === "GeminiAI" ? "incoming" : "outgoing",
											position: message.position, // Call the message in the State
										}}
									/>
								))}
							</MessageList>
							<MessageInput placeholder="Nhập vào tin nhắn..." sendButton onSend={handleSendRequest} />
						</ChatContainer>
					</MainContainer>
				</div>
			</div>
		</div>
	);
};

export default Chat;
