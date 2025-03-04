import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyForm } from "./company-form";

export function CompanyDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Informações da empresa</DialogTitle>
      </DialogHeader>
      <div className="mt-5">
        <CompanyForm />
      </div>
    </DialogContent>
  );
}
