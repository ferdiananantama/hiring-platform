"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addUserToIndexedDB } from "@/utils/indexedDBUtils";
import { useNavigate } from "react-router-dom";

const signupFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
  });

type SignupFormValues = z.infer<typeof signupFormSchema>;

export function SignupForm1({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const route = useNavigate()
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    try {
      const payload = {
        email: form.getValues("email"),
        password: form.getValues("email"),
        role: form.getValues("email").includes("admin") ? "admin" : "user",
      };
      addUserToIndexedDB(payload);
    } catch (error) {
      console.log(error);
    } finally {
      route("/auth/sign-in")
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="px-5">
        <CardHeader className="text-start">
          <CardTitle className="text-xl">Bergabung dengan Rakamin</CardTitle>
          <div className="text-sm">
            Sudah punya akun?{" "}
            <a
              href="/auth/sign-in"
              className="underline underline-offset-4 text-[#01959f]"
            >
              Masuk
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light">
                          Alamat Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Masukkan email"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit)} // Memanggil handleSubmit tanpa ()
                    className="w-full cursor-pointer bg-[#FBC037] text-primary font-bold"
                  >
                    Daftar dengan email
                  </Button>

                  <div className="flex items-center justify-center">
                    <div className="flex-1 border-t border-[#9E9E9E]"></div>
                    <span className="mx-4 text-sm text-[#9E9E9E]">or</span>
                    <div className="flex-1 border-t border-[#9E9E9E]"></div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Daftar dengan Google
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
