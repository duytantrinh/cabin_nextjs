import Image from "next/image";

import about2 from "@/public/about-2.jpg"
import { getCabins } from "../_lib/data-service";

// "cache sẽ re-fetch mỗi ngày"
export const revalidate = 86400; 

export const metadata = {
  title: "About",
}

export default async function Page() {
  const cabins = await getCabins();


  return (
    <div className="grid grid-cols-5  gap-x-24 md:gap-y-32 gap-y-8 text-lg items-center">
      <div className="md:col-span-3 col-span-5">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p>
            Where nature&#39;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury cabins.
            It&apos;s about the experience of reconnecting with nature and enjoying
            simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real freedom and
            peace you&apos;ll find in the surrounding mountains. Wander through lush
            forests, breathe in the fresh air, and watch the stars twinkle above
            from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by nature&apos;s
            splendor. It&rsquo;s a place to slow down, relax, and feel the joy of
            being together in a beautiful setting.
          </p>
        </div>
      </div>

      {/* // (nếu bắt buộc phải chèn hình dang src"/hinh.png") 
      // (b1: ngoài div cha thêm relative và   aspect-square) */}
      <div className="md:col-span-2 col-span-5 relative aspect-square">
        <Image
          src="/about-1.jpg"
          alt="Family sitting around a fire pit in front of cabin"
          // (b2. thêm 2 dòng dưới => ko cần gán width, height cho hình)
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100%"
        />
      </div>

      <div className="md:col-span-2 col-span-5">
        <Image src={about2} alt="Family that manages The Wild Oasis" />
      </div>

      <div className="md:col-span-3 col-span-5">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&rsquo;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&rsquo;re not just a
            guest; you&rsquo;re part of our extended family. So join us at The Wild
            Oasis soon, where tradition meets tranquility, and every visit is
            like coming home.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
