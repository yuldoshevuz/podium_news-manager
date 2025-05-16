-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "app_version" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "locate" TEXT NOT NULL,
    "timezone" INTEGER NOT NULL,
    "os" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "content_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "image" TEXT,
    "url" TEXT[],

    CONSTRAINT "NewsContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "News_content_id_key" ON "News"("content_id");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "NewsContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
