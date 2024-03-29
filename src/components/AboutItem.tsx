import { clsx } from "clsx"

const AboutItem = ({
  heading,
  text,
  link,
}: {
  heading: string
  text: string
  link?: string
}) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className="group flex justify-between gap-6 md:gap-10 flex-col md:flex-row"
  >
    <div className="md:border-b">
      <h2
        className={clsx(
          "font-serif text-4xl sm:text-5xl text-white drop-shadow-[0_0_1px_rgb(0,0,0)] md:w-[348px] tracking-wider",
          link &&
            "group-hover:text-black group-hover:drop-shadow-none transition-all"
        )}
      >
        {heading}
      </h2>
    </div>

    <p className="text-lg leading-7 grow shrink border-b xl:w-[700px] pb-4">
      {text}
    </p>
  </a>
)

export default AboutItem
