-- CreateTable
CREATE TABLE "project_states" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "state_version" INTEGER NOT NULL DEFAULT 1,
    "approved_requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rejected_decisions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "open_questions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "current_api_specs" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "project_states_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_states_user_id_key" ON "project_states"("user_id");

-- AddForeignKey
ALTER TABLE "project_states" ADD CONSTRAINT "project_states_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
