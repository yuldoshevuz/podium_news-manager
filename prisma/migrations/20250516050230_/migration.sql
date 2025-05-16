-- CreateTable
CREATE TABLE "DeviceNewsShown" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "news_id" INTEGER NOT NULL,
    "shown_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceNewsShown_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeviceNewsShown" ADD CONSTRAINT "DeviceNewsShown_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceNewsShown" ADD CONSTRAINT "DeviceNewsShown_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
