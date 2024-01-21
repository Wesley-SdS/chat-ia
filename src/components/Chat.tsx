import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useChat } from 'ai/react';

import { ThemeProvider, useTheme } from 'next-themes';

export default function Chat() {
  const [assistantName, ] = useState("IntelliFlow");
  const [isLoading, setIsLoading] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // Personalizar informações da IA
  const assistantInfo = {
    name: assistantName,
    bio: "IntelliFlow: Seu assistente inteligente, simplificando o fluxo de dados.",
  };

  useEffect(() => {
    // Detecta quando uma nova mensagem é recebida e para o indicador de carregamento
    if (messages.length > 0 && messages[messages.length - 1].role === "assistant") {
      setIsLoading(false);
    }
  }, [messages]);
  const { theme } = useTheme();
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Card className="dark:bg-dark  mx-10 w-[900px] h-full flex flex-col p-4 border-dotted border-teal-500">
        <CardHeader>
          <CardTitle className="text-orange-600">{assistantInfo.name}</CardTitle>
          <CardDescription>{assistantInfo.bio}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-950">
          {messages.map((message) => {
            const isUser = message.role === "user";
            const alignStyle = isUser ? "justify-end" : "justify-start";
            const bgColor = isUser
            ? "bg-teal-500 rounded-md px-3 "
            : theme === 'dark'
            ? "dark:bg-gray-300 rounded-md px-3 "
            : "light:bg-gray-100 dark:bg-gray-300 rounded-md px-3 ";
        
            const roundedStyle = isUser ? "rounded-r" : "rounded-l";

            return (
              <div key={message.id} className={`flex gap-3 text-sm ${alignStyle}`}>
                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>WS</AvatarFallback>
                    <AvatarImage src="/images/avatar.png" />
                  </Avatar>
                )}

                <div className={`p-2  ${bgColor} ${roundedStyle}`}>
                  <p className={`leading-relaxed  text-slate-950`}>
                    {isUser ? (
                      String(message.content)
                    ) : (
                      <>
                        <span className="block font-bold text-orange-600">
                          {assistantInfo.name}:
                        </span>
                        {String(message.content)}
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-center mt-2">
         
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-600"></div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <form
            className="w-full flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              handleSubmit(e);
            }}
          >
            <Input
              className="dark:bg-gray-900"
              placeholder="Como eu posso te ajudar hoje?"
              value={input}
              onChange={handleInputChange}
            />
            <Button className="bg-orange-600" type="submit">
              Perguntar
            </Button>
          </form>
        </CardFooter>
      </Card>
    </ThemeProvider>
  );
}
