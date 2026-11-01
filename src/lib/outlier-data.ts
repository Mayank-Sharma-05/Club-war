import { OutlierDataset } from "../types/game";

export const OUTLIER_DATASETS: OutlierDataset[] = [
  {
    id: "ds-01",
    title: "Server Response Latency",
    unit: "ms",
    metricDescription: "Cluster benchmark response latency across 12 distributed edge microservices.",
    values: [44, 51, 46, 84, 48, 43, 52, 45, 49, 78, 42, 50],
    outlierIndices: [3, 9], // 84, 78
    targetOutlierCount: 2,
    explanation: "Normal baseline latency hovers between 42ms and 52ms (mean ~47ms, σ ~3.5ms). The observations at 78ms and 84ms deviate by over 8 standard deviations from the cluster mean, indicating localized gateway thread pool congestion.",
  },
  {
    id: "ds-02",
    title: "Inbound Network Packet Payload",
    unit: "KB",
    metricDescription: "Payload size inspection across incoming TCP traffic buffers.",
    values: [65, 71, 62, 68, 112, 59, 73, 64, 118, 70, 66, 61],
    outlierIndices: [4, 8], // 112, 118
    targetOutlierCount: 2,
    explanation: "Baseline inbound telemetry payloads average ~66 KB with an interquartile range of 8 KB (upper fence at 85 KB). The observations at 112 KB and 118 KB significantly exceed normal bounds, characteristic of concealed data smuggling.",
  },
  {
    id: "ds-03",
    title: "GPU Tensor Core Thermal Readings",
    unit: "°C",
    metricDescription: "Real-time thermal sensor readings across neural network inference cluster nodes.",
    values: [51, 74, 49, 54, 52, 50, 78, 55, 48, 53, 56, 51],
    outlierIndices: [1, 6], // 74, 78
    targetOutlierCount: 2,
    explanation: "Under balanced rack cooling, normal inference node temperatures operate stably between 48°C and 56°C. The nodes at 74°C and 78°C represent distinct thermal anomalies caused by unauthorized background compute jobs.",
  },
  {
    id: "ds-04",
    title: "Database Query Execution Time",
    unit: "ms",
    metricDescription: "Index scan query response durations in the central analytics warehouse.",
    values: [22, 26, 19, 47, 24, 21, 27, 20, 52, 25, 23, 28],
    outlierIndices: [3, 8], // 47, 52
    targetOutlierCount: 2,
    explanation: "Standard indexed B-tree lookups execute reliably between 19ms and 28ms (median 23.5ms). The execution times of 47ms and 52ms diverge sharply from the quartile range, indicating lock contention or unoptimized subqueries.",
  },
  {
    id: "ds-05",
    title: "API Authentication Token Exchange Time",
    unit: "ms",
    metricDescription: "Time taken to validate JWT signatures across campus OAuth endpoints.",
    values: [68, 118, 74, 71, 65, 126, 76, 69, 72, 122, 66, 75],
    outlierIndices: [1, 5, 9], // 118, 126, 122
    targetOutlierCount: 3,
    explanation: "Normal signature verification completes within 65ms to 76ms. The three readings at 118ms, 122ms, and 126ms represent abnormal timing variations caused by cryptographic verification retries or directory lookup delays.",
  },
  {
    id: "ds-06",
    title: "Microservice Memory Footprint",
    unit: "MB",
    metricDescription: "Resident set size (RSS) memory consumption per microservice container.",
    values: [238, 252, 368, 244, 261, 235, 382, 258, 241, 264, 248],
    outlierIndices: [2, 6], // 368, 382
    targetOutlierCount: 2,
    explanation: "Nominal worker nodes consume 235MB to 264MB under normal load. The allocations at 368MB and 382MB exceed the upper statistical fence, signifying anomalous buffer accumulation or uncollected memory leaks.",
  },
  {
    id: "ds-07",
    title: "Cluster Ingress Bandwidth Transfer",
    unit: "Mbps",
    metricDescription: "Bandwidth usage per second across ingress reverse proxies.",
    values: [38, 76, 44, 35, 41, 82, 33, 46, 37, 79, 42, 39],
    outlierIndices: [1, 5, 9], // 76, 82, 79
    targetOutlierCount: 3,
    explanation: "Typical inbound traffic fluctuates smoothly between 33 and 46 Mbps. The three anomalies at 76, 79, and 82 Mbps deviate significantly from baseline distribution, indicating localized request spikes.",
  },
  {
    id: "ds-08",
    title: "Failed SSH Logon Attempts per IP",
    unit: "attempts",
    metricDescription: "Failed authentication handshake counts monitored by the campus firewall.",
    values: [5, 8, 4, 22, 7, 3, 6, 26, 9, 5, 4, 7],
    outlierIndices: [3, 7], // 22, 26
    targetOutlierCount: 2,
    explanation: "Standard authentication errors from legitimate users range between 3 and 9 attempts. The observations of 22 and 26 failed attempts are statistically distinct outliers characteristic of low-frequency automated dictionary probes.",
  },
];
