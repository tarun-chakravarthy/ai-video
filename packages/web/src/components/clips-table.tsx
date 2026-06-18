'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Copy, Edit2 } from 'lucide-react';

interface Clip {
  id: number;
  start: number;
  end: number;
  label: string;
}

interface ClipsTableProps {
  clips: Clip[];
  selectedClipId: number | null;
  onSelectClip: (clipId: number) => void;
  onDeleteClip: (clipId: number) => void;
  onDuplicateClip: (clipId: number) => void;
  onEditClip: (clipId: number) => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(2);
  return `${mins}:${secs.padStart(5, '0')}`;
};

export const ClipsTable: React.FC<ClipsTableProps> = ({
  clips,
  selectedClipId,
  onSelectClip,
  onDeleteClip,
  onDuplicateClip,
  onEditClip,
}) => {
  if (clips.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">No clips yet. Create your first clip from the timeline.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="w-12">
              <input
                type="checkbox"
                className="rounded border border-input bg-background"
                disabled
              />
            </TableHead>
            <TableHead className="font-semibold text-foreground">Clip Label</TableHead>
            <TableHead className="text-right font-semibold text-foreground">Start</TableHead>
            <TableHead className="text-right font-semibold text-foreground">End</TableHead>
            <TableHead className="text-right font-semibold text-foreground">Duration</TableHead>
            <TableHead className="w-[150px] text-right font-semibold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clips.map((clip) => {
            const duration = clip.end - clip.start;
            return (
              <TableRow
                key={clip.id}
                className={`cursor-pointer transition-colors ${
                  selectedClipId === clip.id
                    ? 'bg-accent hover:bg-accent/80'
                    : 'hover:bg-muted/50'
                } border-b border-border/50`}
                onClick={() => onSelectClip(clip.id)}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedClipId === clip.id}
                    onChange={() => onSelectClip(clip.id)}
                    className="rounded border border-input bg-background cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">{clip.label}</TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {formatTime(clip.start)}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {formatTime(clip.end)}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {formatTime(duration)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClip(clip.id);
                      }}
                      className="h-8 w-8 p-0"
                      title="Edit clip"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateClip(clip.id);
                      }}
                      className="h-8 w-8 p-0"
                      title="Duplicate clip"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClip(clip.id);
                      }}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      title="Delete clip"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
