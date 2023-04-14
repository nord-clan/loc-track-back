-- CreateEnum
CREATE TYPE "EDepartment" AS ENUM ('Department', 'Office', 'Subdivision');

-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "EEventPrivacy" AS ENUM ('Public', 'Private', 'Invitation');

-- CreateEnum
CREATE TYPE "ENodesLinksFormType" AS ENUM ('Hermit', 'CatmallaRoma', 'Bezier', 'BSpline', 'NURBS', 'HodgeJohnson');

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "city" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "telegramUserName" TEXT,
    "mobile" TEXT,
    "personalMail" TEXT,
    "birthDate" TIMESTAMP(3),
    "dismissalDate" TIMESTAMP(3),
    "employmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "ERole" NOT NULL DEFAULT 'User',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Layer" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "officeId" TEXT NOT NULL,

    CONSTRAINT "Layer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "pos" DOUBLE PRECISION[],
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "angle" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "layerId" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NodeData" (
    "nodeId" TEXT NOT NULL,
    "index" SERIAL NOT NULL,
    "allowMove" BOOLEAN NOT NULL DEFAULT true,
    "allowResize" BOOLEAN NOT NULL DEFAULT true,
    "backgroundSrc" TEXT,
    "customCss" TEXT
);

-- CreateTable
CREATE TABLE "NodesLinks" (
    "fromNodeId" TEXT NOT NULL,
    "toNodeId" TEXT NOT NULL,
    "type" "ENodesLinksFormType" NOT NULL DEFAULT 'Bezier',

    CONSTRAINT "NodesLinks_pkey" PRIMARY KEY ("fromNodeId","toNodeId")
);

-- CreateTable
CREATE TABLE "NodeType" (
    "name" TEXT NOT NULL,
    "size" DOUBLE PRECISION[],
    "numberOfUsers" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NodeType_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "UsersOnNode" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activationAt" TIMESTAMP(3) NOT NULL,
    "deactivationAt" TIMESTAMP(3),

    CONSTRAINT "UsersOnNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EDepartment" NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnDepartments" (
    "userId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnDepartments_pkey" PRIMARY KEY ("userId","departmentId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "nodeId" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activationAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deactivationAt" TIMESTAMP(3) NOT NULL,
    "privacy" "EEventPrivacy" NOT NULL DEFAULT 'Public',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventInvites" (
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "EventInvites_pkey" PRIMARY KEY ("eventId","userId","createdBy")
);

-- CreateTable
CREATE TABLE "UsersOnEvent" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnEvent_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateTable
CREATE TABLE "SkillBasement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "SkillBasement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersSkills" (
    "userId" TEXT NOT NULL,
    "skillBasementId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersSkills_pkey" PRIMARY KEY ("userId","skillBasementId")
);

-- CreateTable
CREATE TABLE "GqlMetric" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "duration" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "kind" TEXT NOT NULL,
    "args" JSONB,
    "parentType" TEXT NOT NULL,
    "pothosOptions" JSONB,

    CONSTRAINT "GqlMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_id_key" ON "VerificationToken"("id");

-- CreateIndex
CREATE INDEX "VerificationToken_userId_idx" ON "VerificationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Office_id_key" ON "Office"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Office_name_key" ON "Office"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Layer_id_key" ON "Layer"("id");

-- CreateIndex
CREATE INDEX "Layer_officeId_idx" ON "Layer"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "Node_id_key" ON "Node"("id");

-- CreateIndex
CREATE INDEX "Node_type_idx" ON "Node"("type");

-- CreateIndex
CREATE INDEX "Node_layerId_idx" ON "Node"("layerId");

-- CreateIndex
CREATE UNIQUE INDEX "NodeData_nodeId_key" ON "NodeData"("nodeId");

-- CreateIndex
CREATE INDEX "NodesLinks_fromNodeId_idx" ON "NodesLinks"("fromNodeId");

-- CreateIndex
CREATE INDEX "NodesLinks_toNodeId_idx" ON "NodesLinks"("toNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "NodeType_name_key" ON "NodeType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOnNode_id_key" ON "UsersOnNode"("id");

-- CreateIndex
CREATE INDEX "UsersOnNode_userId_idx" ON "UsersOnNode"("userId");

-- CreateIndex
CREATE INDEX "UsersOnNode_nodeId_idx" ON "UsersOnNode"("nodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_id_key" ON "Department"("id");

-- CreateIndex
CREATE INDEX "UsersOnDepartments_departmentId_idx" ON "UsersOnDepartments"("departmentId");

-- CreateIndex
CREATE INDEX "UsersOnDepartments_userId_idx" ON "UsersOnDepartments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE INDEX "Event_createdBy_idx" ON "Event"("createdBy");

-- CreateIndex
CREATE INDEX "Event_nodeId_idx" ON "Event"("nodeId");

-- CreateIndex
CREATE INDEX "EventInvites_createdBy_idx" ON "EventInvites"("createdBy");

-- CreateIndex
CREATE INDEX "EventInvites_userId_idx" ON "EventInvites"("userId");

-- CreateIndex
CREATE INDEX "EventInvites_eventId_idx" ON "EventInvites"("eventId");

-- CreateIndex
CREATE INDEX "UsersOnEvent_userId_idx" ON "UsersOnEvent"("userId");

-- CreateIndex
CREATE INDEX "UsersOnEvent_eventId_idx" ON "UsersOnEvent"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillBasement_id_key" ON "SkillBasement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SkillBasement_name_key" ON "SkillBasement"("name");

-- CreateIndex
CREATE INDEX "UsersSkills_userId_idx" ON "UsersSkills"("userId");

-- CreateIndex
CREATE INDEX "UsersSkills_skillBasementId_idx" ON "UsersSkills"("skillBasementId");

-- CreateIndex
CREATE UNIQUE INDEX "GqlMetric_id_key" ON "GqlMetric"("id");
