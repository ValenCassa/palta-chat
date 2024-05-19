import { SignIn } from "@clerk/nextjs";

const LogInPage = () => {
  return (
    <div className="grid h-screen w-screen place-content-center">
      <SignIn />
    </div>
  );
};

export default LogInPage;
