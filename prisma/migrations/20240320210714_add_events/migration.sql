-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "object" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "actor_name" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "action_object" TEXT NOT NULL,
    "action_name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "target_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "metadata_redirect" TEXT NOT NULL,
    "metadata_description" TEXT NOT NULL,
    "metadata_x_request_id" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
