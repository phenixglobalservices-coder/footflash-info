import React from 'react';

export const AdBanner320x50: React.FC = () => {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : 'c031e63c6870ceea5d31212942269817',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highrevenueformat.com/c031e63c6870ceea5d31212942269817/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
        Sponsor
      </span>
      <div className="w-[320px] h-[50px] overflow-hidden rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-center shadow-md">
        <iframe
          title="Annonce 320x50"
          width="320"
          height="50"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          srcDoc={adHtml}
        />
      </div>
    </div>
  );
};
