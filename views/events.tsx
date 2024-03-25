import { FormattedEvent } from "@/lib/format-event";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import Image from "next/image";
import React from "react";
import { IdPageProps } from "@/pages/[id]";

const groupRelated = (e: FormattedEvent) => {
  return {
    actor: {
      id: e.actor_id,
      name: e.actor_name,
    },
    action: e.action,
    metadata: e.metadata,
    target: {
      id: e.target_id,
      name: e.target_name,
    },
    id: "" + e.id,
    object: e.object,
    location: e.location,
    "occurred at": e.occurred_at,
  };
};

export default function Event(data: IdPageProps) {
  if (data.error || !data.data) {
    return (
      <>
        <h2 className={"text-xl whitespace-pre mb-2"}>
          {data.error ?? "Error happened.\n try again later."}
        </h2>
        <div className={"flex flex-row items-center justify-center gap-2"}>
          <Button onClick={() => window.location.reload()}>
            Reload the Page
          </Button>
          <p>Or</p>
          <Button asChild variant={"secondary"}>
            <NextLink href={"/"}>Go To Home Page </NextLink>
          </Button>
        </div>
      </>
    );
  }

  const event = groupRelated(data.data);
  return (
    <div>
      <Button asChild variant={"secondary"} className={"mb-4"}>
        <NextLink href={"/"}>
          <Image
            src={"/right-arrow.svg"}
            alt={"arrow"}
            width={7}
            height={7}
            className={"rotate-180 filter invert mr-2 hover:invert-0"}
          />
          Back to Dashboard
        </NextLink>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 rounded border-black w-fit p-4 bg-gray-100">
        {Object.keys(event).map((k) => {
          const key = k as keyof typeof event;
          const isObj = typeof event[key] === "object";
          const isString = typeof event[key] === "string";

          return (
            <div key={key} className={"w-fit"}>
              <h3 className={"text-xl capitalize"}>{k}</h3>
              {isObj ? <hr className={"my-2"} /> : null}
              {isObj ? (
                <ul>
                  {Object.keys(event[key]).map((p) => {
                    const innerKey =
                      p as keyof (typeof event)[keyof typeof event];

                    return (
                      <li className="flex flex-row gap-4 pl-2 w-fit" key={p}>
                        <p>• {p}</p>
                        <p>{event[key][innerKey]}</p>
                      </li>
                    );
                  })}
                </ul>
              ) : isString ? (
                <p>{event[key] as string}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
