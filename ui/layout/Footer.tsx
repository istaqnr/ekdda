import Image from "next/image";
import Link from "next/link";

export const Footer = () => (
  <div className="bg-gray-100 h-[80px] min-h-[80px] max-h-[80px] flex gap-4 relative items-center jutify-center overflow-hidden justify-between">
    <div className="flex h-full flex-row items-center gap-4">
      <div className="h-full w-[5px] bg-white" />
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex flex-wrap gap-3">
          <Link href="/">
            <div className="text-primary hover:underline">Όροι Χρήσης</div>
          </Link>
          <Link href="/">
            <div className="text-primary hover:underline">Sitemap</div>
          </Link>
          <Link href="/">
            <div className="text-primary hover:underline"> GDPR</div>
          </Link>
          <Link href="/">
            <div className="text-primary hover:underline">RSS</div>
          </Link>
        </div>
        <div className="text-xs text-gray-400 hidden md:block">
          © {new Date().getFullYear()} - Ανώτατο Συμβούλιο Επιλογής Προσωπικού
        </div>
      </div>
    </div>
    <div className="flex justify-end items-center pr-4">
      <Link href="https://ose.gr/" target="">
        <Image
          className="duration-500 transition-all hover:scale-[0.9]"
          src="/el/ERA-Logo.svg"
          alt="ose logo"
          width={100}
          height={30}
          unoptimized
        />
      </Link>
    </div>
  </div>
);
