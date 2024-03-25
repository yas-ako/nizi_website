import { defineEventHandler } from "h3";
import { readBody } from "h3";
import testData from "@/assets/testData.json";

export default defineEventHandler(async (event) => {
  // const prompt = (await readBody(event)) || {};
  // console.log(prompt);
  const data = $fetch(useRuntimeConfig().GAS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  });
  // console.log(data);
  // const response = await fetch(process.env.GAS_URL, {
  //   method: "GET",
  //   // body: prompt,
  //   headers: {
  //     "Content-Type": "text/plain;charset=utf-8",
  //   },
  // });
  // console.log(JSON.stringify(response));
  // const response = testData;
  // console.log(response.status);
  // console.log(data);
  return {
    data,
  };
});
