import prisma from "./index";

async function main() {
  const response = await prisma.events.createMany({
    data: [
      {
        object: "event",
        actor_id: "user_3VG74289PUA2",
        actor_name: "Ali Salah",
        group: "instatus.com",
        action_id: "evt_action_PGTD81NCAOQ23",
        action_object: "event_action",
        action_name: "user.login_succeeded",
        target_id: "user_DOKVD1U3L030",
        target_name: "ali@instatus.com",
        location: "105.40.62.95",
        occurred_at: "2022-01-05T14:31:13.607Z",
        metadata_redirect: "/setup",
        metadata_description: "User login succeeded.",
        metadata_x_request_id: "req_W1Y13QOHMI5H",
      },
      {
        object: "event",
        actor_id: "user_3VG74289PUA2",
        actor_name: "Jan Ghaly",
        group: "jankaram.com",
        action_id: "evt_action_PGTD81NCAOQ24",
        action_object: "event_action",
        action_name: "user.login_succeeded",
        target_id: "user_DOKVD1U3L030",
        target_name: "jankaram2020@gmail.com",
        location: "105.40.62.95",
        occurred_at: "2023-01-05T14:31:13.607Z",
        metadata_redirect: "/setup",
        metadata_description: "User login succeeded.",
        metadata_x_request_id: "req_W1Y13QOHMI5H",
      },
      {
        object: "event",
        actor_id: "user_3VG74289PUA2",
        actor_name: "Tony Karam",
        group: "instatus.com",
        action_id: "evt_action_PGTD81NCAOQ25",
        action_object: "event_action",
        action_name: "user.login_succeeded",
        target_id: "user_DOKVD1U3L030",
        target_name: "ali@instatus.com",
        location: "105.40.62.95",
        occurred_at: "2024-01-05T14:31:13.607Z",
        metadata_redirect: "/setup",
        metadata_description: "User login succeeded.",
        metadata_x_request_id: "req_W1Y13QOHMI5H",
      },
    ],
  });
  console.log("response", response);
  console.log(await prisma.events.findMany());
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
