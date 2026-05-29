import { notFound } from "next/navigation";
import { KeyRound, UserCog } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { EditarUsuarioForm } from "@/components/forms/EditarUsuarioForm";
import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { obtenerUsuarioPorId } from "@/services/usuario.service";

type EditarUsuarioPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Editar usuario",
};

export default async function EditarUsuarioPage({
  params,
}: EditarUsuarioPageProps) {
  const usuario = await obtenerUsuarioPorId(params.id);

  if (!usuario) {
    notFound();
  }

  return (
    <PageShell maxWidth="md">
      <PageHeader
        eyebrow="Usuarios"
        title="Editar usuario"
        description="Modificá datos básicos, rol y estado del usuario registrado."
        backHref="/usuarios"
        backLabel="Volver a usuarios"
      />

      <SectionCard
        title="Datos del usuario"
        description="El administrador puede cambiar rol y estado, pero no define la contraseña del usuario."
        icon={<UserCog className="h-5 w-5" />}
      >
        <EditarUsuarioForm usuario={usuario} />
      </SectionCard>

      <SectionCard
        title="Reset de contraseña"
        description="Usá esta opción si el usuario olvidó su clave. El sistema generará una contraseña temporal automática y obligará al usuario a cambiarla al iniciar sesión."
        icon={<KeyRound className="h-5 w-5" />}
      >
        <ResetPasswordForm usuarioId={usuario.id} />
      </SectionCard>
    </PageShell>
  );
}