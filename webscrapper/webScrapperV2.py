import requests, csv, os
from bs4 import BeautifulSoup
from firebaseConsole import FirebaseConsole

def getCharacterData(url):
    soup = getWebPage(url)
    tab = soup.find('div', class_="a-tabContainer")
    return tab
def getSilverWolfData(url):
    soup = getWebPage(url)
    tab = soup.find('table', class_="a-table a-table")
    return tab
def saveCharacterImages(characterLinks, imagesPath):
    if not os.path.exists(imagesPath):
        os.makedirs(imagesPath)
    for link in characterLinks:
        img_data = requests.get(link.next.attrs["data-src"]).content
        with open(imagesPath + link.text.strip(' ') + '.png', 'wb') as handler:
            handler.write(img_data)
    return 
def getWebPage(url):
    request = requests.get(url)
    soup = BeautifulSoup(request.text, 'html.parser')
    return soup
def getAllPlayableCharacterTableLinks(soup):
    body = soup.find('body')
    col3 = body.find('div', class_= "l-3col")
    centerCol3 = col3.find('div', class_= "l-3colMain")
    mainCenterCol3 = centerCol3.find('div', class_= "l-3colMain__center l-3colMain__center--shadow")
    archiveStyleWrapper = mainCenterCol3.find('div', class_ = "archive-style-wrapper")
    tables = archiveStyleWrapper.find_all('table', class_= "a-table a-table a-table tablesorter")
    a = tables[1].find_all('a')
    return a
def getLinks(tableLinks):
    characterLinks = []
    count = 0
    for link in tableLinks:
        if count % 4 == 0:
            characterLinks.append(link)
        count += 1
    return characterLinks
def appendMainStats(list :list):
    strippedList = []
    for element in list:
        element = element.strip(':')
        element = element.strip()
        element = element.strip('%')
        strippedList.append({"data": element, "checked": False})
    return strippedList
def writeToFireStore(characterLinks):
    db = FirebaseConsole()
    for link in characterLinks:
        name = link.text.strip(' ')
        print('Writing',name,'data...')
        lightCone = ''
        relics = []
        ornament = []
        bodyMainStat = []
        feetMainStat = []
        sphereMainStat = []
        ropeMainStat = []
        if name == 'Silver Wolf':
            silverWolfData = getSilverWolfData(link.attrs["href"])
            silverWolfInfo = silverWolfData.find_all('a')
            silverWolfMainStats = silverWolfData.find_all('b')
            lightCone += silverWolfInfo[0].text
            relics.append(silverWolfInfo[4].text)
            ornament.append(silverWolfInfo[5].text)
            bodyMainStat = appendMainStats(silverWolfMainStats[3].nextSibling.split('or'))
            feetMainStat = appendMainStats(silverWolfMainStats[4].nextSibling.split('or'))
            sphereMainStat = appendMainStats(silverWolfMainStats[5].nextSibling.split('or'))
            ropeMainStat = appendMainStats(silverWolfMainStats[6].nextSibling.split('or'))
        else:
            characterData = getCharacterData(link.attrs["href"])
            guideInfo = characterData.find_all('a')
            tr = characterData.find_all('tr')
            mainStats = tr[4].find_all('b')
            lightCone += guideInfo[0].text
            if len(guideInfo) == 8:
                relics.append(guideInfo[1].text)
                ornament.append(guideInfo[2].text)
            elif len(guideInfo) == 9:
                relics.append(guideInfo[1].text)
                relics.append(guideInfo[2].text)
                ornament.append(guideInfo[3].text)
            bodyMainStat = appendMainStats(mainStats[0].nextSibling.split('/'))
            feetMainStat = appendMainStats(mainStats[1].nextSibling.split('/'))
            sphereMainStat = appendMainStats(mainStats[2].nextSibling.split('/'))
            ropeMainStat = appendMainStats(mainStats[3].nextSibling.split('/'))
        lightCone = lightCone.strip()

        db.writeToCollection(name,lightCone,relics,bodyMainStat,feetMainStat,ornament,sphereMainStat,ropeMainStat)
    return

# hard coded settings
url = 'https://game8.co/games/Honkai-Star-Rail/archives/404256'
imagesPath = './webscrapper/images/'

soup = getWebPage(url)
tableLinks = getAllPlayableCharacterTableLinks(soup)
characaterLinks = getLinks(tableLinks)
# This function makes a folder in the repo and saves the image assets for each character
# TODO add cli interface for this process so we don't have to open the code everytime to change settings
#saveCharacterImages(characaterLinks, imagesPath)
writeToFireStore(characaterLinks)