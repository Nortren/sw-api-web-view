import React, { FC } from 'react';
import { useRouter } from 'next/router';
import classes from './BackRoutingButton.module.scss';
import Button from '../Button/Button';
import usePathHistory from '../../helpers/routerHelpers/routerHelpers';
import { LeftOutlined } from '@ant-design/icons';

const BackRoutingButton: FC = () => {
  const routing = useRouter();
  const pathname = routing.pathname;

  const pathList = usePathHistory(pathname);
  const previousPath = pathList.previous;
  const backPathName = previousPath ? previousPath : 'Back';

  const goBack = () => {
    routing.back();
  };

  return (
    <div>
      {pathList.current && (
        <Button
          type={'text'}
          onClick={goBack}
          className={classes.breadcrumb_container__button}
        >
          <div className={classes.breadcrumb_container__text}>
            <LeftOutlined /> {backPathName}
          </div>
        </Button>
      )}
    </div>
  );
};

export default BackRoutingButton;
