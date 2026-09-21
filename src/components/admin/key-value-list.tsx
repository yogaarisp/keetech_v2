"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function KeyValueList({
  aName,
  bName,
  aHeader,
  bHeader,
  aPlaceholder,
  bPlaceholder,
  initial,
}: {
  aName: string;
  bName: string;
  aHeader: string;
  bHeader: string;
  aPlaceholder?: string;
  bPlaceholder?: string;
  initial: [string, string][];
}) {
  const [rows, setRows] = useState<[string, string][]>(initial);

  function update(index: number, column: 0 | 1, value: string) {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? (column === 0 ? [value, row[1]] : [row[0], value]) : row)),
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {aHeader}
        </Label>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {bHeader}
        </Label>
        <span />
      </div>

      {rows.map(([a, b], index) => (
        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <Input
            name={aName}
            value={a}
            placeholder={aPlaceholder}
            onChange={(e) => update(index, 0, e.target.value)}
          />
          <Input
            name={bName}
            value={b}
            placeholder={bPlaceholder}
            onChange={(e) => update(index, 1, e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-muted-foreground hover:text-destructive"
            onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}
            aria-label="Hapus baris"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => setRows((prev) => [...prev, ["", ""]])}
      >
        <Plus className="h-4 w-4" />
        Tambah Baris
      </Button>
    </div>
  );
}
