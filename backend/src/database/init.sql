CREATE TABLE IF NOT EXISTS CUSTOMITEMS{
    customItemsId INT AUTO_INCREMENT PRIMARY KEY,
    Bottom VARCHAR(50),
    Bow VARCHAR(50),
    Earring VARCHAR(50),
    EyeBrow VARCHAR(50),
    Eyes VARCHAR(50),
    Face VARCHAR(50),
    FaceMask VARCHAR(50),
    FacialHair VARCHAR(50),
    Glasses VARCHAR(50),
    Hair VARCHAR(50),
    Hat VARCHAR(50),
    Head VARCHAR(50),
    Nose VARCHAR(50),
    Outfit VARCHAR(50),
    Shoes VARCHAR(50),
    TOPITEM VARCHAR(50),
}

CREATE TABLE IF NOT EXISTS User{ 
    userId INT AUTO_INCREMENT PRIMARY KEY , 
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    nickName  NVARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    balance INT DEFAULT 200,
    Foreign Key (customItemsId) REFERENCES CUSTOMITEMS(customItemsId)
}