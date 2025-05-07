"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function TimePicker() {
  const [time, setTime] = useState<string>("")
  const [hours, setHours] = useState<number>(12)
  const [minutes, setMinutes] = useState<number>(0)
  const [period, setPeriod] = useState<"AM" | "PM">("AM")

  const handleTimeChange = (newHours: number, newMinutes: number, newPeriod: "AM" | "PM") => {
    setHours(newHours)
    setMinutes(newMinutes)
    setPeriod(newPeriod)

    const formattedHours = newHours.toString().padStart(2, "0")
    const formattedMinutes = newMinutes.toString().padStart(2, "0")
    setTime(`${formattedHours}:${formattedMinutes} ${newPeriod}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !time && "text-muted-foreground")}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex gap-2 items-end">
          <div className="grid gap-1">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              className="w-16"
              type="number"
              min={1}
              max={12}
              value={hours}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value)
                if (value >= 1 && value <= 12) {
                  handleTimeChange(value, minutes, period)
                }
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="minutes">Minutes</Label>
            <Input
              id="minutes"
              className="w-16"
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value)
                if (value >= 0 && value <= 59) {
                  handleTimeChange(hours, value, period)
                }
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="period">Period</Label>
            <div className="flex">
              <Button
                type="button"
                variant={period === "AM" ? "default" : "outline"}
                className="rounded-r-none"
                onClick={() => handleTimeChange(hours, minutes, "AM")}
              >
                AM
              </Button>
              <Button
                type="button"
                variant={period === "PM" ? "default" : "outline"}
                className="rounded-l-none"
                onClick={() => handleTimeChange(hours, minutes, "PM")}
              >
                PM
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
