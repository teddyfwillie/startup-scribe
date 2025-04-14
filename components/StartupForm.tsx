"use client";

import React, { useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createStartup } from "@/lib/actions";

const StartupForm = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);

      const result = await createStartup(prevState, formData, pitch);
      console.log(result);
      if (result.status === "SUCCESS") {
        toast("Startup created successfully");
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const filedErrors = error.flatten().fieldErrors;
        setError(filedErrors as unknown as Record<string, string>);
        toast("Please check the form for errors");
        return { ...prevState, error: "Validation Error", status: "ERROR" };
      }
    }
    toast("An unexpected error has occurred");
    return {
      ...prevState,
      error: "An unexpected error has occurred",
      status: "ERROR",
    };
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
  return (
    <form
      action={formAction}
      className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6"
    >
      <div>
        <label
          htmlFor="title"
          className="font-bold text-[18px] text-black uppercase"
        >
          Title
        </label>
        <Input
          name="title"
          id="title"
          required
          placeholder="Enter startup title"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
        />
        {error.title && <p className="text-red-500 mt-2 ml-5">{error.title}</p>}
      </div>
      <div>
        <label
          htmlFor="description"
          className="font-bold text-[18px] text-black uppercase"
        >
          Description
        </label>
        <Textarea
          name="description"
          id="description"
          required
          placeholder="Enter startup description (Tech startup, Business startup, etc.)"
          className="border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300"
        />
        {error.description && (
          <p className="text-red-500 mt-2 ml-5">{error.description}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="category"
          className="font-bold text-[18px] text-black uppercase"
        >
          Category
        </label>
        <Input
          name="category"
          id="category"
          required
          placeholder="Enter startup category"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
        />
        {error.category && (
          <p className="text-red-500 mt-2 ml-5">{error.category}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="link"
          className="font-bold text-[18px] text-black uppercase"
        >
          Image URL
        </label>
        <Input
          name="link"
          id="link"
          required
          placeholder="Enter startup image URL"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
        />
        {error.link && <p className="text-red-500 mt-2 ml-5">{error.link}</p>}
      </div>
      <div data-color-mode="light">
        <label
          htmlFor="pitch"
          className="font-bold text-[18px] text-black uppercase"
        >
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          height={300}
          id="pitch"
          preview="edit"
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your startup idea, and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {error.pitch && <p className="text-red-500 mt-2 ml-5">{error.pitch}</p>}
      </div>
      <button
        type="submit"
        className="bg-[#2E5BFF] border-[4px] border-black flex items-center justify-center rounded-full p-5 min-h-[70px] w-full font-bold text-[18px] text-white "
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Startup"}
        <Send className="size-6 ml-2" />
      </button>
    </form>
  );
};

export default StartupForm;
