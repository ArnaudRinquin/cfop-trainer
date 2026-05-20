import { exportData, importData, resetAll } from '~/lib/state';

interface Props {
  labels: {
    exportProgress: string;
    importProgress: string;
    reset: string;
    confirmReset: string;
    importFailed: string;
  };
}

export default function DataManagement({ labels }: Props) {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className="link-underline hover:text-ink-100"
        onClick={() => {
          const data = exportData();
          const blob = new Blob([data], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `cfop-progress-${new Date().toISOString().slice(0, 10)}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        {labels.exportProgress}
      </button>
      <button
        type="button"
        className="link-underline hover:text-ink-100"
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'application/json';
          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            try {
              const text = await file.text();
              importData(text);
            } catch (err) {
              alert(labels.importFailed.replace('{message}', (err as Error).message));
            }
          };
          input.click();
        }}
      >
        {labels.importProgress}
      </button>
      <button
        type="button"
        className="link-underline hover:text-red-400"
        onClick={() => {
          if (confirm(labels.confirmReset)) resetAll();
        }}
      >
        {labels.reset}
      </button>
    </div>
  );
}
