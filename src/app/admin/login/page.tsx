import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="mx-auto max-w-[380px] py-20">
      <h1 className="text-xl font-bold text-body-text">Aureo admin</h1>
      <p className="description mt-2 text-sm">
        Sign in to edit room rates, photos and payment details.
      </p>
      <LoginForm next={next ?? "/admin"} />
    </div>
  );
}
