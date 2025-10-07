-- -- CreateTable
-- CREATE TABLE `Task` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `taskName` VARCHAR(191) NOT NULL,
--     `detail` VARCHAR(191) NOT NULL DEFAULT '',
--     `dueDate` DATETIME(3) NOT NULL,
--     `progress` VARCHAR(191) NOT NULL DEFAULT 'Not Started',
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
 
 -- Create user
CREATE USER 'taskmate_user'@'localhost' IDENTIFIED BY 'secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON project_app.* TO 'taskmate_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Verify
SELECT user, host FROM mysql.user WHERE user = 'taskmate_user';