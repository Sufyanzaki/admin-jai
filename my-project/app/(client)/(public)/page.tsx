import {HeroSection} from "./_components/hero-section";
import {Card} from "@/components/client/ux/card";
import {Button} from "@/components/client/ux/button";
import RecentlyJoined from "./_components/recently-joined";
import {Container} from "@/components/client/ux/container";
import {SignupForm} from "./_components/signup-form";

const steps = [
  {
    number: "01",
    title: "Create your free account",
    description: "Nulla vitae elit libero pharetra augue dapibus.",
    cardMargin: "lg:mr-12",
  },
  {
    number: "02",
    title: "Create your details",
    description: "Vivamus sagittis lacus vel augue laoreet.",
    cardMargin: "lg:ml-12",
  },
  {
    number: "03",
    title: "Connect with users",
    description: "Cras mattis consectetur purus sit amet.",
    cardMargin: "lg:mr-12",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="lg:hidden block sticky">
        <SignupForm />
      </div>
      <div className="sticky">
        <section className="w-full py-[50px] xl:pt-[115px] bg-white xl:pb-[92px]">
          <Container className="px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-items-center">
              <div className="space-y-3 py-3">
                <h2 className="text-black text-[22px] font-bold lg:text-[26px] xl:text-[34px] xl:leading-[48px] mb-[14px]">
                  How do you meet singles on our dating site?{" "}
                </h2>
                <p className="text-[#011026] text-base font-normal xl:text-xl xl:leading-[31px]">
                  Find out everything you need to know and more about how our
                  website works.
                </p>
                <p className="pt-4 pb-5 text-[#676770] text-sm xl:text-base font-normal leading-[23px]">
                  Aenean eu leo ​​quam. Pellentesque ornare sem lacinia quam
                  venenatis vestibulum. Etiam porta sem malesuada magna mollis
                  euismod. Nullam id dolor id nibh ultricies vehicula ut id
                  elit. Nullam quis risus eget urna mollis ornare.
                </p>
                <div className="flex space-x-4">
                  <Button variant="theme" size="lg">
                    Add Profile
                  </Button>
                </div>
              </div>
              <div className="space-y-5 w-full lg:w-fit">
                {steps.map((step, index) => (
                  <Card
                    key={index}
                    className={`flex flex-row px-6 items-start space-x-4 bg-transparent py-[27px] ${step.cardMargin}`}
                  >
                    <div className="w-10 h-10 bg-app-sky-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 lg:text-base xl:text-lg md:text-xl">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 lg:text-sm xl:text-base md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>
        <section className="bg-[#f7f8fb] py-[50px] xl:pt-20">
          <Container className="px-4 md:px-6 space-y-24">
            <RecentlyJoined />
          </Container>
        </section>
      </div>
    </main>
  );
}
