// "use client";

// import { useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { LogOut, Loader2 } from "lucide-react";
// import { logoutAction } from "@/actions/auth.actions";

// export function LogoutButton() {
//   const router = useRouter();
//   const [pending, startTransition] = useTransition();

//   function handleLogout() {
//     startTransition(async () => {
//       await logoutAction();
//       router.push("/login");
//       router.refresh();
//     });
//   }

//   return (
//     <button
//       type="button"
//       onClick={handleLogout}
//       disabled={pending}
//       className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950"
//     >
//       {pending ? (
//         <Loader2 className="h-4 w-4 animate-spin" />
//       ) : (
//         <LogOut className="h-4 w-4" />
//       )}
//       <span className="hidden sm:inline">Salir</span>
//     </button>
//   );
// }

// src/components/layout/LogoutButton.tsx

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";

export function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
      router.push("/login");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-[13px] font-medium text-red-700 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-red-900/70 dark:bg-slate-900 dark:text-red-300 dark:hover:bg-red-950/30"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}

      <span className="hidden sm:inline">Salir</span>
    </button>
  );
}