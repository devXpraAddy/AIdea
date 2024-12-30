"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Camera, Download, ImageIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProModal } from "@/hooks/use-pro-modal";
import { formSchema } from "./constants";
import Heading from "@/components/heading";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import Image from "next/image";
import toast from "react-hot-toast";

const PhotoPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [photos, setPhotos] = useState<{
    original: string;
    restored: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image);

      const response = await fetch("/api/photo", {
        method: "POST",
        body: formData,
      });

      if (response.status === 403) {
        proModal.onOpen();
        return;
      }

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const restoredImageUrl = await response.json();

      setPhotos({
        original: URL.createObjectURL(values.image),
        restored: restoredImageUrl,
      });

      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Heading
        title="Photo Enhancement"
        description="Transform old and damaged photos into enhanced versions."
        icon={Camera}
        iconColor="text-purple-500"
        bgColor="bg-purple-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid gap-2"
          >
            <FormField
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload an image"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Restore Photo
            </Button>
          </form>
        </Form>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {!photos && !isLoading && <Empty label="No photos restored yet." />}
          {photos && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-0 aspect-square relative">
                  <Image
                    src={photos.original}
                    alt="Original"
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </CardContent>
                <CardFooter className="p-2">
                  <p className="text-sm text-muted-foreground w-full text-center">
                    Original
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-0 aspect-square relative">
                  <Image
                    src={photos.restored}
                    alt="Restored"
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </CardContent>
                <CardFooter className="p-2 flex-col gap-2">
                  <p className="text-sm text-muted-foreground w-full text-center">
                    Restored
                  </p>
                  <Button
                    onClick={() => window.open(photos.restored)}
                    variant="secondary"
                    className="w-full"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
