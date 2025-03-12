import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyForm } from "./company-form";
import { UserCompany } from "@/_types/user-company";

interface Props {
  data: UserCompany;
}

export function CompanyDialog({ data }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Informações da empresa</DialogTitle>
      </DialogHeader>
      <div className="mt-5">
        <CompanyForm defaultValues={data} />
      </div>
    </DialogContent>
  );
}
