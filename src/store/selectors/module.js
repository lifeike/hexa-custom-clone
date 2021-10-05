const chestPockets = {
  none: {
    status: '3',
    code: 'no',
  },
  left: {
    status: '1',
    code: 'left',
  },
  both: {
    status: '2',
    code: 'both',
  },
};

const translatePocketCodeToAngle = (code, angle) => {
  const isBoth = code === chestPockets.both.code;
  const bothProblemAngle = angle === '2' || angle === '6' || angle === '7';

  if (isBoth && bothProblemAngle) {
    return chestPockets.left.code;
  }

  const isLeft = code === chestPockets.left.code;
  const leftProblemAngle = angle === '4';

  if (isLeft && leftProblemAngle) {
    return chestPockets.none.code;
  }

  return code;
};

const toPocketCode = (chestPocketStatus, angle) => {
  if (!chestPocketStatus || chestPocketStatus === chestPockets.none.status) {
    return translatePocketCodeToAngle(chestPockets.none.code, angle);
  }

  if (chestPocketStatus === chestPockets.left.status) {
    return translatePocketCodeToAngle(chestPockets.left.code, angle);
  }

  if (chestPocketStatus === chestPockets.both.status) {
    return translatePocketCodeToAngle(chestPockets.both.code, angle);
  }

  return undefined;
};

const toFlapCode = (hasFlap, angle) => {
  if (angle === '6' || angle === '7') {
    return '';
  }

  return hasFlap ? 'flap_pocket' : 'zipper_pocket';
};

const getFiles = (dir, chestPocketStatus, hasFlap) => {
  if (dir.files) {
    return dir.files;
  }

  const subDirs = Object.keys(dir).map(key => (
    {
      dir: key,
      files: dir[key].files,
    }
  ));

  const angle = subDirs[0].dir[0];
  const pocketCode = toPocketCode(chestPocketStatus, angle);
  const flapCode = toFlapCode(hasFlap, angle);

  return subDirs
    .find(sd => sd.dir.includes(flapCode) && sd.dir.includes(pocketCode))
    .files
    .map(f => f.toLowerCase());
};


//these methods help determine which fields to use as the structure changes if an order has been submitted, for reasons
const toDetails = windbreaker => windbreaker.cartSubDetail || windbreaker.orderDetails;
const toItemNoField = windbreaker => windbreaker.cartSubDetail ? 'itemNo' : 'item_no';
const toOptionNoField  = windbreaker => windbreaker.cartSubDetail ? 'optionNo' : 'option_no';

const toChestPocketStatus = windbreaker =>
  toDetails(windbreaker).find(item => item[toItemNoField(windbreaker)] === "I005")[toOptionNoField(windbreaker)];

export const hasChestPocket = windbreaker => toChestPocketStatus(windbreaker) !== chestPockets.none.status;

export const hasFlap = windbreaker => toDetails(windbreaker).find(item => item[toItemNoField(windbreaker)] === "I030")[toOptionNoField(windbreaker)] === '2';

export const getWindbreakerFiles = (dir, windbreaker) =>
  getFiles(dir, toChestPocketStatus(windbreaker), hasFlap(windbreaker));
