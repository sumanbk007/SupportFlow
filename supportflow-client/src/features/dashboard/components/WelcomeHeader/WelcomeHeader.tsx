import { Button } from "@ui/button/Button";
import { Modal } from "@ui/index";
import { useState } from "react";

interface WelcomeHeaderProps {
  name: string;
  date: string;
}

const WelcomeHeader = ({ name, date }: WelcomeHeaderProps) => {
  const [createTicket, setCreateTicket] = useState(false);
  const openCreateTicketModal = () => setCreateTicket(true);
  const closeCreateTicketModal = () => setCreateTicket(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Welcome back, {name}
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Track your existing request or submit new inquiry {""}
          <span className="font-medium text-[var(--text-primary)]">{date}</span>
          .
        </p>
      </div>

      <Button onClick={openCreateTicketModal}>Create new Ticket</Button>
      {createTicket && (
        <Modal
          open={createTicket}
          onCancel={closeCreateTicketModal}
          closable={true}
          title="Create the new Ticket"
        />
      )}
    </div>
  );
};

export { WelcomeHeader };
