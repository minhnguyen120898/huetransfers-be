-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "CarBookingStatus" AS ENUM ('confirmed', 'completed', 'cancelled', 'transferred');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'partial', 'completed');

-- CreateEnum
CREATE TYPE "PaymentCollection" AS ENUM ('no_collection', 'collect_from_guest');

-- CreateEnum
CREATE TYPE "PaymentDirection" AS ENUM ('received', 'paid');

-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM ('create', 'update', 'delete', 'login', 'export');

-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('agency', 'guide', 'restaurant', 'transport');

-- CreateEnum
CREATE TYPE "TransportType" AS ENUM ('4', '7', '16', '29', '45');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "tel" VARCHAR(50),
    "avatar_url" VARCHAR(500),
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "must_change_password" BOOLEAN NOT NULL DEFAULT false,
    "email_verification_token" VARCHAR(255),
    "password_reset_token" VARCHAR(255),
    "password_reset_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "jti" VARCHAR(100) NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "device_info" VARCHAR(255),
    "ip_address" VARCHAR(45),
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_revoked" BOOLEAN NOT NULL DEFAULT false,
    "revoked_at" TIMESTAMP(3),
    "revoked_by" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used_at" TIMESTAMP(3),

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_agencies" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "tel" VARCHAR(50),
    "address" TEXT,
    "note" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "travel_agencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_bookings" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "booking_code" VARCHAR(50) NOT NULL,
    "travel_agency_id" UUID,
    "vehicle_type" "TransportType" NOT NULL,
    "service_date" DATE NOT NULL,
    "guest_name" VARCHAR(255) NOT NULL,
    "guest_phone" VARCHAR(255),
    "guest_count" INTEGER NOT NULL DEFAULT 1,
    "pickup_location" TEXT,
    "dropoff_location" TEXT,
    "vat" BOOLEAN NOT NULL DEFAULT false,
    "selling_price" DECIMAL(15,2) NOT NULL,
    "receiving_price" DECIMAL(15,2) NOT NULL,
    "debt_amount" DECIMAL(15,2) NOT NULL,
    "payment_collection" "PaymentCollection" NOT NULL,
    "payment_collection_note" TEXT,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "paid_at" TIMESTAMP(3),
    "status" "CarBookingStatus" NOT NULL DEFAULT 'confirmed',
    "note" TEXT,
    "routes" TEXT,
    "is_transfer" BOOLEAN NOT NULL DEFAULT false,
    "transfer_from_id" UUID,
    "transfer_to_agency_id" UUID,
    "transfer_reason" TEXT,
    "transferred_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "car_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_records" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "partner_type" "PartnerType" NOT NULL,
    "partner_id" UUID NOT NULL,
    "debt_record_id" UUID,
    "payment_direction" "PaymentDirection" NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_method" VARCHAR(50),
    "reference_number" VARCHAR(100),
    "note" TEXT,
    "receipt_url" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,

    CONSTRAINT "payment_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "action" "ActivityAction" NOT NULL,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" UUID,
    "old_values" JSONB,
    "new_values" JSONB,
    "ip_address" VARCHAR(50),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_jti_key" ON "refresh_tokens"("jti");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_expires_at_idx" ON "refresh_tokens"("expires_at");

-- CreateIndex
CREATE INDEX "travel_agencies_name_idx" ON "travel_agencies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "car_bookings_booking_code_key" ON "car_bookings"("booking_code");

-- CreateIndex
CREATE INDEX "car_bookings_service_date_idx" ON "car_bookings"("service_date");

-- CreateIndex
CREATE INDEX "car_bookings_status_idx" ON "car_bookings"("status");

-- CreateIndex
CREATE INDEX "idx_car_agency_payment" ON "car_bookings"("travel_agency_id", "service_date", "status", "payment_status");

-- CreateIndex
CREATE INDEX "car_bookings_is_transfer_idx" ON "car_bookings"("is_transfer");

-- CreateIndex
CREATE INDEX "car_bookings_transfer_from_id_idx" ON "car_bookings"("transfer_from_id");

-- CreateIndex
CREATE INDEX "car_bookings_transfer_to_agency_id_idx" ON "car_bookings"("transfer_to_agency_id");

-- CreateIndex
CREATE INDEX "payment_records_partner_type_partner_id_payment_date_idx" ON "payment_records"("partner_type", "partner_id", "payment_date");

-- CreateIndex
CREATE INDEX "activity_logs_user_id_idx" ON "activity_logs"("user_id");

-- CreateIndex
CREATE INDEX "activity_logs_entity_type_entity_id_idx" ON "activity_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "activity_logs_created_at_idx" ON "activity_logs"("created_at");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_agencies" ADD CONSTRAINT "travel_agencies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_agencies" ADD CONSTRAINT "travel_agencies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_bookings" ADD CONSTRAINT "car_bookings_travel_agency_id_fkey" FOREIGN KEY ("travel_agency_id") REFERENCES "travel_agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_bookings" ADD CONSTRAINT "car_bookings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_bookings" ADD CONSTRAINT "car_bookings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_bookings" ADD CONSTRAINT "car_bookings_transfer_from_id_fkey" FOREIGN KEY ("transfer_from_id") REFERENCES "car_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_bookings" ADD CONSTRAINT "car_bookings_transfer_to_agency_id_fkey" FOREIGN KEY ("transfer_to_agency_id") REFERENCES "travel_agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
