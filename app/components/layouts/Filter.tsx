"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import FilterIcon from "../UI/FilterIcon";
// import { toast } from "@/components/ui/use-toast"

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
] as const;

const FormSchema = z.object({
  genres: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one genre.",
  }),
});

export function CheckboxReactHookFormMultiple({
  genres,
  link,
}: {
  genres: { id: number; name: string }[];
  link: string;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      genres: [],
    },
  });
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const genreIds = data.genres; // Extract the genre IDs directly
    const values = { input: genreIds }; // Create the values object
    const inputValuesString = Object.values(values.input).join(","); // Join IDs as comma-separated string
    router.push(`${link}/filter?genre=${inputValuesString}`, { scroll: true });
    router.refresh();
    form.reset();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gray-300 text-black rounded-lg text-xl capitalize">
          <FilterIcon className="w-5 h-5 inline-block text-black" />
          filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-screen-lg mx-auto p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-4">
              <FormLabel className="text-base">Filter by genres</FormLabel>
              {/* <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription> */}
            </div>
            <FormField
              control={form.control}
              name="genres"
              render={() => (
                <FormItem className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-5 gap-x-3">
                  {genres.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="genres"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Filter</Button>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
