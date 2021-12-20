import math
from collections import deque

transmission = 'A052E04CFD9DC0249694F0A11EA2044E200E9266766AB004A525F86FFCDF4B25DFC401A20043A11C61838600FC678D51B8C0198910EA1200010B3EEA40246C974EF003331006619C26844200D414859049402D9CDA64BDEF3C4E623331FBCCA3E4DFBBFC79E4004DE96FC3B1EC6DE4298D5A1C8F98E45266745B382040191D0034539682F4E5A0B527FEB018029277C88E0039937D8ACCC6256092004165D36586CC013A008625A2D7394A5B1DE16C0E3004A8035200043220C5B838200EC4B8E315A6CEE6F3C3B9FFB8100994200CC59837108401989D056280803F1EA3C41130047003530004323DC3C860200EC4182F1CA7E452C01744A0A4FF6BBAE6A533BFCD1967A26E20124BE1920A4A6A613315511007A4A32BE9AE6B5CAD19E56BA1430053803341007E24C168A6200D46384318A6AAC8401907003EF2F7D70265EFAE04CCAB3801727C9EC94802AF92F493A8012D9EABB48BA3805D1B65756559231917B93A4B4B46009C91F600481254AF67A845BA56610400414E3090055525E849BE8010397439746400BC255EE5362136F72B4A4A7B721004A510A7370CCB37C2BA0010D3038600BE802937A429BD20C90CCC564EC40144E80213E2B3E2F3D9D6DB0803F2B005A731DC6C524A16B5F1C1D98EE006339009AB401AB0803108A12C2A00043A134228AB2DBDA00801EC061B080180057A88016404DA201206A00638014E0049801EC0309800AC20025B20080C600710058A60070003080006A4F566244012C4B204A83CB234C2244120080E6562446669025CD4802DA9A45F004658527FFEC720906008C996700397319DD7710596674004BE6A161283B09C802B0D00463AC9563C2B969F0E080182972E982F9718200D2E637DB16600341292D6D8A7F496800FD490BCDC68B33976A872E008C5F9DFD566490A14'
#transmission = '9C005AC2F8F0'

def ReadBits(bitString: str, pointer: int, bitsToRead: int):
    return bitString[pointer : pointer + bitsToRead], pointer + bitsToRead

def PopBits(bitString: deque, numBits: int) -> str:
    bits = ''
    for _ in range(numBits):
        bits += bitString.popleft()
    return bits

def ParseHeader(bitString: deque):
    version = int(PopBits(bitString, 3), 2)
    typeID = int(PopBits(bitString, 3), 2)
    return version, typeID

def ParseLiteral(bitString: str):
    #Returns relative position of cursor and literal in decimal form
    keepReading = PopBits(bitString, 1)
    readLiteral = ''
    while True:
        readLiteral += PopBits(bitString, 4)        
        if keepReading == '0':
            break
        keepReading = PopBits(bitString, 1)
    return int(readLiteral, 2)    

def ProcessOperation(operator, literals):
    if operator == 0:
        return sum(literals)
    elif operator == 1:
        return math.prod(literals)
    elif operator == 2:
        return min(literals)
    elif operator == 3:
        return max(literals)
    elif operator == 5:
        return 1 if literals[0] > literals[1] else 0
    elif operator == 6:
        return 1 if literals[0] < literals[1] else 0
    elif operator == 7:
        return 1 if literals[0] == literals[1] else 0

def ProcessPacket(bitString: deque):
    version = 0
    subPackets = []
    typeID = -1    
    literals = []
    version, typeID = ParseHeader(bitString)
    if typeID == 4: #literal value                  
        return version, ParseLiteral(bitString)
    else: # operator
        lenghtType = PopBits(bitString, 1)
        if lenghtType == '0':
            subPacketLen = int(PopBits(bitString, 15), 2)
            remainingBits = len(bitString)
            while remainingBits - len(bitString) < subPacketLen:
                v, l = ProcessPacket(bitString)
                if type(l) == list:
                    literals += l      
                else:
                    literals.append(l)
                version += v
        else: #Lenght in number of subPackets
            subPacketsNum = int(PopBits(bitString, 11), 2)
            for _ in range(subPacketsNum):
                v, l = ProcessPacket(bitString)
                if type(l) == list:
                    literals += l
                else:
                    literals.append(l)
                version += v 
        subPackets.append(ProcessOperation(typeID, literals))            
        literals.clear()
        return version, subPackets

originBinaryString = ''
for c in transmission:
    originBinaryString += f"{int(f'0x{c}', 16):>04b}".replace('0b', '')

sumVersion, result = ProcessPacket(deque(originBinaryString))


print(f'Part 1 sol: {sumVersion}')
print(f'Part 2 sol: {result[0]}')
