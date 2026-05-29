import { UsersRound } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { UsuariosTable } from "@/components/tables/UsuariosTable";
import { obtenerUsuarios } from "@/services/usuario.service";

export const metadata = {
  title: "Usuarios",
};

export default async function UsuariosPage() {
  const usuarios = await obtenerUsuarios();

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow="Administración"
        title="Usuarios registrados"
        description="Los usuarios se registran por cuenta propia. Desde acá el administrador puede cambiar roles, activar o suspender accesos y resetear contraseñas temporales."
      />

      <SectionCard
        title="Listado de usuarios"
        description="Administrá roles, estado de acceso y contraseñas temporales."
        icon={<UsersRound className="h-5 w-5" />}
      >
        <UsuariosTable usuarios={usuarios} />
      </SectionCard>
    </PageShell>
  );
}