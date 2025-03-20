-- CreateTable
CREATE TABLE "shipping_address" (
    "int" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recipient_name" TEXT NOT NULL,
    "recipient_phone" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "default_shipping_address" BOOLEAN NOT NULL DEFAULT false,
    "default_billing_address" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "shipping_address_pkey" PRIMARY KEY ("int")
);

-- AddForeignKey
ALTER TABLE "shipping_address" ADD CONSTRAINT "shipping_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
