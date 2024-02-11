"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // in the older version it was imported from next/router
import { useState } from "react";
import { ChatCompletionMessage } from "openai/resources/index"; //modified the older version import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    //useForm has it's own loading state so we don't have to use useState for isLoading
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessage = {
        role: "assistant", // for the older version v3 the role was user
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      //TODO: Open Pro Modal
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh(); // used to rehydrate all server components fetching the newest data
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm
            grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={(
                  { field } // field is a part of react-hook-form which has properties such as onChange, onBlur, value, and ref.
                ) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Can you tell me about the cost of solar energy installations?"
                        {...field} // equivalent to <input onChange={field.onChange} onBlur={field.onBlur} value={field.value} name={field.name} />
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 &&
            !isLoading && ( //if messages are not present
              <Empty label="No conversation started." />
            )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map(
              (
                message // if messages are there
              ) => (
                <div
                  key={message.content}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "assistant"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )} //checking if it is our message or message from the AI
                >
                  {message.role === "assistant" ? (
                    <UserAvatar />
                  ) : (
                    // <BotAvatar />
                    <BotAvatar />
                    // <UserAvatar />
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
