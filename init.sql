CREATE TABLE IF NOT EXISTS CUSTOMITEMS (
    customItemsId INT AUTO_INCREMENT PRIMARY KEY,
    Bottom VARCHAR(50),
    Bow VARCHAR(50),
    Earring VARCHAR(50),
    EyeBrow VARCHAR(50),
    Eyes VARCHAR(50) DEFAULT "Eyes.005.glb",
    Face VARCHAR(50) DEFAULT "Face.002.glb",
    FaceMask VARCHAR(50),
    FacialHair VARCHAR(50),
    Glasses VARCHAR(50) DEFAULT "Glasses.001.glb",
    Hair VARCHAR(50) DEFAULT "Hair.004.glb",
    Hat VARCHAR(50) DEFAULT "Hat.003.glb",
    Head VARCHAR(50) DEFAULT "Head.001.glb",
    Nose VARCHAR(50) DEFAULT "Nose.002.glb",
    Outfit VARCHAR(50) DEFAULT "Outfit.002.glb",
    Shoes VARCHAR(50) DEFAULT "Shoes.002.glb",
    TOPITEM VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    nickName NVARCHAR (30),
    balance INT DEFAULT 200,
    isAdmin BOOLEAN DEFAULT 0,
    customItemsId INT,
    FOREIGN KEY (customItemsId) REFERENCES CUSTOMITEMS (customItemsId) ON DELETE CASCADE ON UPDATE CASCADE,
    rankPoint INT DEFAULT 0,
    winGames INT DEFAULT 0,
    lostGames INT DEFAULT 0
);

-- Thêm dữ liệu mẫu vào bảng CUSTOMITEMS
INSERT INTO
    CUSTOMITEMS (
        Bottom,
        Bow,
        Earring,
        EyeBrow,
        FaceMask,
        FacialHair,
        TOPITEM
    )
VALUES (
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );

-- Thêm dữ liệu mẫu vào bảng Users
INSERT INTO
    Users (
        username,
        password,
        nickName,
        balance,
        isAdmin,
        customItemsId,
        rankPoint,
        winGames,
        lostGames
    )
VALUES (
        'user1',
        '24c9e15e52afc47c225b757e7bee1f9d',
        N'Player One',
        300,
        0,
        1,
        0,
        0,
        0
    ),
    (
        'admin',
        '21232f297a57a5a743894a0e4a801fc3',
        N'Admin',
        9999999,
        1,
        2,
        999,
        50,
        2
    ),
    (
        'user2',
        '7e58d63b60197ceb55a1c487989a3720',
        N'Player Two',
        150,
        0,
        3,
        60,
        8,
        12
    );