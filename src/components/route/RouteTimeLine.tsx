import type { Step } from "@/types";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from "@mui/lab";



export default function RouteTimeLine({steps}:{steps:Step[]}) {
  return (
    <Timeline position="alternate" >
      {steps.map((step, i) => (
        <TimelineItem key={i}>
          <TimelineSeparator >
            <TimelineDot />
            {i < steps.length - 1 && <TimelineConnector />}
          </TimelineSeparator >
          <TimelineContent className={`flex flex-col ${i%2===0?"items-start":"items-end"}`}>
            <div className="flex gap-2">
                <div className="text-sm rounded-full flex items-center justify-center bg-primary w-4 h-4">
                {step.index}
            </div>
            <div className="text-xs">
                {step.step}
            </div>
            </div>
            <div className="text-xs pl-5">
                {`${step.arrival.hour}:${step.arrival.minute} - ${step.departure.hour}:${step.departure.minute}`}
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
