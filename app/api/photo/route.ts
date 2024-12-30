import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!image) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const imageBytes = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBytes).toString("base64");

    const response = await replicate.run(
      "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
      {
        input: {
          img: `data:image/jpeg;base64,${imageBase64}`,
        },
      }
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log("[PHOTO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
