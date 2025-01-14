"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  month: string;
  hasPremiumPlan: boolean;
}

function AiReportButton({ month, hasPremiumPlan }: AiReportButtonProps) {
  const [report, setReport] = useState<string | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState<boolean>(false);

  async function handleGenerateReportClick() {
    try {
      setIsLoadingReport(true);
      const aiReport = await generateAiReport({ month });

      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingReport(false);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            Relatório IA
            <BotIcon />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[600px]">
          {hasPremiumPlan ? (
            <>
              <DialogHeader>
                <DialogTitle>Relatório IA</DialogTitle>

                <DialogDescription>
                  Use inteligênia artificial para gerar um relatório com
                  insights sobre suas finanças
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
                <Markdown>{report}</Markdown>
              </ScrollArea>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>

                <Button
                  onClick={handleGenerateReportClick}
                  disabled={isLoadingReport}
                >
                  {isLoadingReport && <Loader2Icon className="animate-spin" />}
                  Gerar relatório
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Relatório IA</DialogTitle>

                <DialogDescription>
                  Você precisa de um plano premium para gerar os relatórios com
                  IA.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>

                <Button asChild>
                  <Link href="/subscription">Assinar plano premium</Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AiReportButton;
