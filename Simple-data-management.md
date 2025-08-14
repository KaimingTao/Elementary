## Simple data management

Version: 2025-07-05


This simple document is for people who have many files, and meet problems about

1. how to categorize and organize them
2. how to store them safely


## Expectations

- It's not possible to do it perfectly, some issues will always be there
    - messy folders
    - missing files
    - broken hardware
    - safety issue
- The vital questions is, which things we care the most


## How to categorize files

Files and data should be separated into these categories for reducing confusion for ourselves

1. personal file and data
2. project related data
    - notes
    - project works
3. collected data from others


## Organize project files

Project can stay for a long time, some ideas tried and getting keep, something in pending, something being deleted.

- Organizing files by date is a good option.
- Organizing files by sub projects

Things are evolving, so the best way is that we have clear mind, and understand what we're doing


## Storage

- Don't store data in your PC or Mac or computer
    - when your computer is lost, you lost everything
    - have some backup
    - Although backing up files are boring, losting data is the irresolvable trouble, more sever problem.
- If you're good at using computer, consider to have a NAS like server
    - I **DON'T** recommend any commercial NAS products, just use Linix + Samba + encrypted HDD is enough
    - Have 3 copy of your data, one in the computer, two offline
    - You don't have to keep the NAS 24/7, only when you need it
    - Don't use big scale disk like 10T+
        - the problems is mirroring the disk is slow
        - and when a harddisk is broken, you need waste hours to rebuild it from new one.
        - SSD is not good for long time off-power storage.
- Use some cloud data storage
    - only for non sensitive data
    - commercial cloud storage services promise they encrypt your data, but
        - you cannot prove it, they cannot neither
        - if encryption algorithms get broken by quantum computer, none of your data is safe
    - expect you data will be accessed by others you don't know in the future

### Data security

- No absolutely safe solution exists, but some are better than others.
- The best way for data security is to not record the data, but we still need to know something.
- The second best way for data security from unknown person to access data is to always offline.
    - it won't prevent you from lost data at home, like computer failure.

- If you want to share files between different computers in local Wi-Fi network
    - NAS or customized NAS is good enough
- If you want to share files remotely, some Cloud storage service is good enough.
    - Still choose the service that claim the encrypt the data.
    - I don't fully trust them because it's a black box
    - The cloud storage is mostly bigger than the storage size of your local computer, so the true file won't be stored in your local machine by just a placeholder, when you access it, the software will download it. Which means for file you always want to access even without internet, It's not a good solution.
- For important data, store self-encrypted version in cloud service, and also a local copy.

## Personal data storage is a distributed system.

We store data in our phones, computers, or cloud services. Hence it's distributed everywhere. So, folder or files that are copies won't be updated at the same time. We cannot be sure all of them can be accessed all the time. Even we have a method to synchornize all devices, it may fail and some backup may broken.

We should accept it, and make sure the important thing is to use our data to finish our work. Not pay to much time to make the system perfect, because the cost won't profit much.
