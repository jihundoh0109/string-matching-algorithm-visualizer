"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserInput } from "@/context/UserInputProvider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@/components/ui/radio-group";

export default function Sidebar() {
  const { setText, setPattern, setAlgorithm } = useUserInput();

  const formSchema = z.object({
    text: z.string().min(1, {
      message: "Please enter a text",
    }),
    pattern: z.string().min(1, {
      message: "Please enter a pattern",
    }),
    algorithm: z.string().min(1, {
      message: "Please select an algorithm",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      pattern: "",
      algorithm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setText(values.text);
    setPattern(values.pattern);
    setAlgorithm(values.algorithm);
  }

  return (
    <div className="h-1/3 md:h-full w-full md:w-1/3 p-4 overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pattern"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pattern</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="algorithm"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose an algorithm</FormLabel>
                <FormControl>
                  <RadioGroup className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="radio"
                          name="algorithm"
                          value="naive"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Naive</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="radio"
                          name="algorithm"
                          value="knuth-morris-pratt"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Knuth–Morris–Pratt &#40;KMP&#41;
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="radio"
                          name="algorithm"
                          value="rabin-karp"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Rabin-Karp</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Visualize</Button>
        </form>
      </Form>
    </div>
  );
}
