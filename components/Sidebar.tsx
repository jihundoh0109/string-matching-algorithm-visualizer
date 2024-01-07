"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useVisualization } from "@/context/VisualizationProvider";
import { bruteForce } from "@/lib/algorithms/brute-force";
import { kmp } from "@/lib/algorithms/kmp";
import { rabinKarp } from "@/lib/algorithms/rabin-karp";
import { SearchResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@/components/ui/radio-group";

const algorithmMap: {
  [key: string]: (text: string, pattern: string) => SearchResult;
} = {
  "brute-force": bruteForce,
  "knuth-morris-pratt": kmp,
  "rabin-karp": rabinKarp,
};

const formSchema = z
  .object({
    text: z.string().min(1, {
      message: "Please enter a text",
    }),
    pattern: z.string().min(1, {
      message: "Please enter a pattern",
    }),
    algorithm: z.string().min(1, {
      message: "Please select an algorithm",
    }),
  })
  .refine((data) => data.text.length >= data.pattern.length, {
    message: "Pattern can't be longer than text",
    path: ["pattern"],
  });

export default function Sidebar() {
  const { setSearchResult, setCurrentProgressIndex, setVisualizationActive } =
    useVisualization();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      pattern: "",
      algorithm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { algorithm, text, pattern } = values;

    setSearchResult(algorithmMap[algorithm](text, pattern));
    setCurrentProgressIndex(0);
    setVisualizationActive(true);
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
                          value="brute-force"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Brute Force</FormLabel>
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
