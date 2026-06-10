// // src/components/forms/ResetPasswordForm.tsx

// "use client";

// import { useFormState, useFormStatus } from "react-dom";
// import { KeyRound, Loader2 } from "lucide-react";
// import {
//   resetPasswordUsuarioAction,
//   type ResetPasswordUsuarioActionState,
// } from "@/actions/usuario.actions";

// type ResetPasswordFormProps = {
//   usuarioId: string;
// };

// const initialState: ResetPasswordUsuarioActionState = {
//   ok: false,
//   message: "",
//   passwordTemporal: "",
// };

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 text-xs font-medium text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70 sm:w-auto"
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-3.5 w-3.5 animate-spin" />
//           Generando
//         </>
//       ) : (
//         <>
//           <KeyRound className="h-3.5 w-3.5" />
//           Generar contraseña temporal
//         </>
//       )}
//     </button>
//   );
// }

// export function ResetPasswordForm({ usuarioId }: ResetPasswordFormProps) {
//   const [state, formAction] = useFormState(
//     resetPasswordUsuarioAction,
//     initialState,
//   );

//   return (
//     <form action={formAction} className="space-y-4">
//       <input type="hidden" name="id" value={usuarioId} />

//       <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//         El administrador no define la contraseña. El sistema genera una clave
//         temporal automática y el usuario deberá cambiarla al iniciar sesión.
//       </div>

//       {state.message ? (
//         <div
//           className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${
//             state.ok
//               ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//               : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//           }`}
//         >
//           {state.message}
//         </div>
//       ) : null}

//       {state.ok && state.passwordTemporal ? (
//         <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-3 dark:border-cyan-900/70 dark:bg-cyan-950/40">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Contraseña temporal
//           </p>

//           <div className="mt-2 rounded-xl border border-cyan-200 bg-white px-3 py-3 font-mono text-sm font-medium text-slate-950 dark:border-cyan-900/70 dark:bg-slate-950 dark:text-cyan-200">
//             {state.passwordTemporal}
//           </div>

//           <p className="mt-2 text-[11px] leading-5 text-cyan-700 dark:text-cyan-300">
//             Copiala ahora. Por seguridad, esta clave no se volverá a mostrar.
//           </p>
//         </div>
//       ) : null}

//       <div className="flex justify-end">
//         <SubmitButton />
//       </div>
//     </form>
//   );
// }

// src/components/forms/ResetPasswordForm.tsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { KeyRound, Loader2, ShieldAlert } from "lucide-react";
import {
  resetPasswordUsuarioAction,
  type ResetPasswordUsuarioActionState,
} from "@/actions/usuario.actions";

type ResetPasswordFormProps = {
  usuarioId: string;
  disabled?: boolean;
  disabledMessage?: string;
};

const initialState: ResetPasswordUsuarioActionState = {
  ok: false,
  message: "",
  passwordTemporal: "",
};

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border px-3 text-xs font-medium transition active:scale-[0.99] sm:w-auto ${
        disabled
          ? "cursor-not-allowed border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-600"
          : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Generando
        </>
      ) : (
        <>
          <KeyRound className="h-3.5 w-3.5" />
          Generar contraseña temporal
        </>
      )}
    </button>
  );
}

export function ResetPasswordForm({
  usuarioId,
  disabled,
  disabledMessage,
}: ResetPasswordFormProps) {
  const [state, formAction] = useFormState(
    resetPasswordUsuarioAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={usuarioId} />

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        El administrador no define la contraseña. El sistema genera una clave
        temporal automática y el usuario deberá cambiarla al iniciar sesión.
      </div>

      {disabled ? (
        <div className="flex gap-2 rounded-2xl border border-red-300 bg-red-50 p-3 text-xs leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {disabledMessage ||
              "No tenés permiso para resetear la contraseña de este usuario."}
          </span>
        </div>
      ) : null}

      {state.message ? (
        <div
          className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      {state.ok && state.passwordTemporal ? (
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-3 dark:border-cyan-900/70 dark:bg-cyan-950/40">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Contraseña temporal
          </p>

          <div className="mt-2 rounded-xl border border-cyan-200 bg-white px-3 py-3 font-mono text-sm font-medium text-slate-950 dark:border-cyan-900/70 dark:bg-slate-950 dark:text-cyan-200">
            {state.passwordTemporal}
          </div>

          <p className="mt-2 text-[11px] leading-5 text-cyan-700 dark:text-cyan-300">
            Copiala ahora. Por seguridad, esta clave no se volverá a mostrar.
          </p>
        </div>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton disabled={disabled} />
      </div>
    </form>
  );
}