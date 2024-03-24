import { mkConfig, generateCsv, download } from "export-to-csv";
import { FormattedEvent } from "@/lib/format-event";

const flattenData = (
  obj: Record<string, unknown | Record<string, unknown>>,
  prefix = "",
) => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + "_" : "";
    if (typeof obj[k] === "object" && obj[k] !== null) {
      // @ts-ignore
      Object.assign(acc, flattenData(obj[k], pre + k));
    } else {
      // @ts-ignore
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

const formatKeys = (o: Record<string, string>) => {
  let obj: Record<string, string> = {};
  Object.keys(o).map((k) => {
    const newKey = k.replaceAll("_", " ");
    obj[newKey] = o[k];
  });
  return obj;
};

export const downloadCSV = (data: FormattedEvent[]) => {
  const csvConfig = mkConfig({ useKeysAsHeaders: true });
  const flatData = data.map((d) => formatKeys(flattenData(d)));
  const csv = generateCsv(csvConfig)(flatData);
  download(csvConfig)(csv);
};
