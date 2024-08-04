import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import runChat from "../config/gemini";

const Chat = () => {
	const [messages, setMessages] = useState([
		{
			message: "Chào bạn, tôi là AI . Tôi có thể giúp gì bạn á !",
			sentTime: "just now",
			sender: "GeminiAI",
			position: "single",
			direction: "incoming",
		},
	]);
	const [isTyping, setIsTyping] = useState(false);

	const handleSendRequest = async (message) => {
		const newMessage = {
			message,
			direction: "outgoing",
			sender: "user",
			position: "first",
		};

		setMessages((prevMessages) => [...prevMessages, newMessage]);
		setIsTyping(true);

		try {
			const response = await runChat(message); // Call the runChat function
			const geminiAIResponse = {
				message: response,
				sender: "GeminiAI",
			};
			setMessages((prevMessages) => [...prevMessages, geminiAIResponse]);
		} catch (error) {
			console.error("Error processing message:", error);
		} finally {
			setIsTyping(false);
		}
	};

	return (
		<div className="App">
			<div className="row">
				<div className="col position-relative" style={{ height: "360px" }}>
					<MainContainer>
						<ChatContainer>
							<MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="Gemini AI đang soạn tin nhắn..." /> : null}>
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
